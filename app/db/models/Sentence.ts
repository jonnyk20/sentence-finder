import { Model, Column, Table, HasMany, DefaultScope, BelongsToMany, ForeignKey } from "sequelize-typescript";
import SentenceTranslation from "./SentenceTranslation";

@DefaultScope(() => ({
  attributes: ["id", "text", "tatoebaId"],
  include: [SentenceTranslation],
}))
@Table
class Sentence extends Model {
  @Column
  text!: string;

  @Column
  language!: string;

  @Column({primaryKey: true})
  tatoebaId!: number;

  @HasMany(() => SentenceTranslation, { sourceKey: 'tatoebaId', foreignKey: 'sentenceId' })
  sentenceTranslations!: SentenceTranslation[];
}

export default Sentence;