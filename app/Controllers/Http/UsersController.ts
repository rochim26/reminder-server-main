import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

// OOP => Object Oriented Programming -> Class
export default class UsersController {
  public async profil({ auth }: HttpContextContract) {
    return await auth.authenticate();
  }

  public async daftar({ auth, request, response }: HttpContextContract) {
    // destructuring object
    const { nama, email, password } = request.body();

    // kita cek apakah email user tersebut sudah terdaftar atau belum sebelumnya
    const user = await User.query().where("email", email).first();

    if (user) {
      return response.conflict({
        message: "Email sudah terdaftar",
      });
    }

    // kita akan menyimpan user pendaftar ke dalam database
    const userTerdaftar = await User.create({
      nama: nama,
      email: email,
      password: password,
    });

    // Generate token
    const token = await auth.use("api").generate(userTerdaftar);

    return token;
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body();

    // Lookup user manually
    const user = await User.query().where("email", email).first();

    if (!user) {
      return response.notFound({
        message: "User belum terdaftar",
      });
    }

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized({
        message: "Password anda salah",
      });
    }

    // Generate token
    const token = await auth.use("api").generate(user);

    return token;
  }

  // Method
  public async index(
    // Parameters
    {}: HttpContextContract
  ) {
    // INTELLISENSE

    // JS / TS asyncronous => dia berjalan tidak berdasarkan sequence / urutan
    return await User.query();
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
