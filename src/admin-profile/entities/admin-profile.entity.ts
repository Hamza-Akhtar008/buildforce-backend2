import { User } from 'src/user/entities/user.entity';
import { JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

export class AdminProfile {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;
  @OneToOne(() => User, (user) => user.labourProfile)
  @JoinColumn({ name: 'id' })
  user: User;
}
