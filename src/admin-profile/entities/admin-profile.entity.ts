import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('admin_profiles')
export class AdminProfile {
  @PrimaryColumn({ type: 'bigint' })
  id: bigint;
  @OneToOne(() => User, (user) => user.adminProfile)
  @JoinColumn({ name: 'id' })
  user: User;
}
