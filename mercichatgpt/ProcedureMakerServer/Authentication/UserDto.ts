//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { EntityBase } from '../../EFCoreBase/Entities/EntityBase';
import { Lawyer } from '../Entities/Lawyer';
import { RoleTypes } from './RoleTypes';

export class UserDto extends EntityBase
{
	public name: string;
	public lawyer: Lawyer;
	public roles: RoleTypes[];
}
