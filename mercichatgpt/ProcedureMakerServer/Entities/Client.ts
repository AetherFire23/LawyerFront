//     This code was generated by a Reinforced.Typings tool.
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { CourtMemberBase } from './BaseEntities/CourtMemberBase';
import { Lawyer } from './Lawyer';
import { Case } from '../../EFCoreBase/Entities/Case';

export class Client extends CourtMemberBase
{
	public lawyerId: string;
	public lawyer: Lawyer;
	public cases: Case[];
}