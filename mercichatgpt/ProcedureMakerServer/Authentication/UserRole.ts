//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { EntityBase } from '../../EFCoreBase/Entities/EntityBase';
import { Role } from './Role';
import { User } from './User';

export class UserRole extends EntityBase
{
	public roleId: string;
	public role: Role;
	public userId: string;
	public user: User;
}