//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { EntityBase } from '../../../EFCoreBase/Entities/EntityBase';

export abstract class PersonBase extends EntityBase
{
	public firstName: string;
	public lastName: string;
	public postalCode: string;
	public country: string;
	public email: string;
	public address: string;
	public city: string;
	public mobilePhoneNumber: string;
	public workPhoneNumber: string;
	public homePhoneNumber: string;
	public hasJuridicalAid: boolean;
	public dateOfBirth: Date;
	public socialSecurityNumber: string;
}
