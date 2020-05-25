import {
  Model,
  Column,
  Table,
  ForeignKey,
  HasMany,
  BelongsToMany,
  BelongsTo,
  DefaultScope,
  HasOne,
} from 'sequelize-typescript';
import Sentence from './Sentence';

@Table
class SentenceTranslation extends Model {
  @ForeignKey(() => Sentence)
  @BelongsTo(() => Sentence, { targetKey: 'tatoebaId', as: 'translation' })
  @Column
  sentenceId!: number;

  @Column
  translationId!: number;
}

export default SentenceTranslation;
