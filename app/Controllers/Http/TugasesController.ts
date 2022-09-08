import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Tugas from "App/Models/Tugas";

export default class TugasesController {
  public async index({ auth }: HttpContextContract) {
    const user = await auth.authenticate();

    return await Tugas.query().where("userId", user.id);
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const { deadline, deskripsi } = request.body();
    const user = await auth.authenticate();

    const tugas = await Tugas.create({
      deadline,
      deskripsi,
      userId: user.id,
    });

    if (tugas) {
      return response.ok({
        message: "Data berhasil ditambahkan",
      });
    }

    return response.badRequest({
      message: "Data tidak berhasil ditambahkan",
    });
  }

  public async update({
    auth,
    response,
    request,
    params: { id },
  }: HttpContextContract) {
    const { deadline, deskripsi } = request.body();
    const user = await auth.authenticate();

    const cek = await Tugas.query()
      .where("id", id)
      .andWhere("userId", user.id)
      .first();

    if (!cek) {
      return response.forbidden({
        message: "Kamu tidak memiliki akses untuk mengupdate data berikut",
      });
    }

    const tugas = await Tugas.query().where("id", id).update({
      deadline,
      deskripsi,
      userId: user.id,
    });

    if (tugas) {
      return response.ok({
        message: "Data berhasil diupdate",
      });
    }

    return response.badRequest({
      message: "Data tidak berhasil diupdate",
    });
  }

  public async destroy({
    auth,
    response,
    params: { id },
  }: HttpContextContract) {
    const user = await auth.authenticate();

    const cek = await Tugas.query()
      .where("id", id)
      .andWhere("userId", user.id)
      .first();

    if (!cek) {
      return response.forbidden({
        message: "Kamu tidak memiliki akses untuk mengupdate data berikut",
      });
    }

    const tugas = await Tugas.query().where("id", id).delete();

    if (tugas) {
      return response.ok({
        message: "Data berhasil didelete",
      });
    }

    return response.badRequest({
      message: "Data tidak berhasil didelete",
    });
  }
}
