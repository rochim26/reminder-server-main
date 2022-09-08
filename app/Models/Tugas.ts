import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Tugas extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public deadline: string;

  @column()
  public deskripsi: string;

  // camel case
  @column()
  public userId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
