import { userApi2 as api } from "./userApi2";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCaseGetcasescontext: build.query<
      GetCaseGetcasescontextApiResponse,
      GetCaseGetcasescontextApiArg
    >({
      query: () => ({ url: `/case/getcasescontext` }),
    }),
    postCaseCreatenewcase: build.mutation<
      PostCaseCreatenewcaseApiResponse,
      PostCaseCreatenewcaseApiArg
    >({
      query: (queryArg) => ({
        url: `/case/createnewcase`,
        method: "POST",
        params: { clientId: queryArg.clientId },
      }),
    }),
    putCaseSavecase: build.mutation<
      PutCaseSavecaseApiResponse,
      PutCaseSavecaseApiArg
    >({
      query: (queryArg) => ({
        url: `/case/savecase`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putCaseUpdatelawyer: build.mutation<
      PutCaseUpdatelawyerApiResponse,
      PutCaseUpdatelawyerApiArg
    >({
      query: (queryArg) => ({
        url: `/case/updatelawyer`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putCaseAddclient: build.mutation<
      PutCaseAddclientApiResponse,
      PutCaseAddclientApiArg
    >({
      query: () => ({ url: `/case/addclient`, method: "PUT" }),
    }),
    putCaseUpdateclient: build.mutation<
      PutCaseUpdateclientApiResponse,
      PutCaseUpdateclientApiArg
    >({
      query: (queryArg) => ({
        url: `/case/updateclient`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getCaseCreatecaseparticipant: build.query<
      GetCaseCreatecaseparticipantApiResponse,
      GetCaseCreatecaseparticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/case/createcaseparticipant`,
        params: { caseId: queryArg.caseId },
      }),
    }),
    getCaseUpdatecaseparticipant: build.query<
      GetCaseUpdatecaseparticipantApiResponse,
      GetCaseUpdatecaseparticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/case/updatecaseparticipant`,
        body: queryArg.body,
      }),
    }),
    deleteCaseRemovecaseparticipant: build.mutation<
      DeleteCaseRemovecaseparticipantApiResponse,
      DeleteCaseRemovecaseparticipantApiArg
    >({
      query: (queryArg) => ({
        url: `/case/removecaseparticipant`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    getCaseAuthorizedrequest: build.query<
      GetCaseAuthorizedrequestApiResponse,
      GetCaseAuthorizedrequestApiArg
    >({
      query: () => ({ url: `/case/authorizedrequest` }),
    }),
    postFileUploadfile: build.mutation<
      PostFileUploadfileApiResponse,
      PostFileUploadfileApiArg
    >({
      query: (queryArg) => ({
        url: `/file/uploadfile`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getInvoiceAccountClientidByClientId: build.query<
      GetInvoiceAccountClientidByClientIdApiResponse,
      GetInvoiceAccountClientidByClientIdApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/account/clientid=${queryArg.clientId}`,
      }),
    }),
    getInvoiceGettrustclientcarddtoClientidByClientId: build.query<
      GetInvoiceGettrustclientcarddtoClientidByClientIdApiResponse,
      GetInvoiceGettrustclientcarddtoClientidByClientIdApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/gettrustclientcarddto/clientid=${queryArg.clientId}`,
      }),
    }),
    postInvoiceCreateinvoice: build.mutation<
      PostInvoiceCreateinvoiceApiResponse,
      PostInvoiceCreateinvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/createinvoice`,
        method: "POST",
        params: { caseId: queryArg.caseId },
      }),
    }),
    putInvoiceUpdateinvoice: build.mutation<
      PutInvoiceUpdateinvoiceApiResponse,
      PutInvoiceUpdateinvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/updateinvoice`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putInvoiceArchiveinvoice: build.mutation<
      PutInvoiceArchiveinvoiceApiResponse,
      PutInvoiceArchiveinvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/archiveinvoice`,
        method: "PUT",
        params: { invoiceId: queryArg.invoiceId },
      }),
    }),
    postInvoiceCreateactivity: build.mutation<
      PostInvoiceCreateactivityApiResponse,
      PostInvoiceCreateactivityApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/createactivity`,
        method: "POST",
        params: {
          invoiceId: queryArg.invoiceId,
          isDisburse: queryArg.isDisburse,
          isTaxable: queryArg.isTaxable,
        },
      }),
    }),
    putInvoiceUpdateactivity: build.mutation<
      PutInvoiceUpdateactivityApiResponse,
      PutInvoiceUpdateactivityApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/updateactivity`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putInvoiceRemoveactivity: build.mutation<
      PutInvoiceRemoveactivityApiResponse,
      PutInvoiceRemoveactivityApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/removeactivity`,
        method: "PUT",
        params: { activityId: queryArg.activityId },
      }),
    }),
    postInvoiceCreatebillingelement: build.mutation<
      PostInvoiceCreatebillingelementApiResponse,
      PostInvoiceCreatebillingelementApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/createbillingelement`,
        method: "POST",
        params: { lawyerId: queryArg.lawyerId },
      }),
    }),
    postInvoiceUpdatebillingelement: build.mutation<
      PostInvoiceUpdatebillingelementApiResponse,
      PostInvoiceUpdatebillingelementApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/updatebillingelement`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    postInvoiceDeletebillingelement: build.mutation<
      PostInvoiceDeletebillingelementApiResponse,
      PostInvoiceDeletebillingelementApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/deletebillingelement`,
        method: "POST",
        params: { billingElementId: queryArg.billingElementId },
      }),
    }),
    postInvoiceAddfundstotrust: build.mutation<
      PostInvoiceAddfundstotrustApiResponse,
      PostInvoiceAddfundstotrustApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/addfundstotrust`,
        method: "POST",
        params: { clientId: queryArg.clientId },
      }),
    }),
    putInvoiceUpdatetrustpayment: build.mutation<
      PutInvoiceUpdatetrustpaymentApiResponse,
      PutInvoiceUpdatetrustpaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/updatetrustpayment`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteInvoiceRemovetrustpayment: build.mutation<
      DeleteInvoiceRemovetrustpaymentApiResponse,
      DeleteInvoiceRemovetrustpaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/removetrustpayment`,
        method: "DELETE",
        params: { trustPaymentId: queryArg.trustPaymentId },
      }),
    }),
    putInvoiceAddinvoicepayment: build.mutation<
      PutInvoiceAddinvoicepaymentApiResponse,
      PutInvoiceAddinvoicepaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/addinvoicepayment`,
        method: "PUT",
        params: { invoiceId: queryArg.invoiceId },
      }),
    }),
    putInvoiceUpdateinvoicepayment: build.mutation<
      PutInvoiceUpdateinvoicepaymentApiResponse,
      PutInvoiceUpdateinvoicepaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/updateinvoicepayment`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putInvoiceRemoveinvoicepayment: build.mutation<
      PutInvoiceRemoveinvoicepaymentApiResponse,
      PutInvoiceRemoveinvoicepaymentApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/removeinvoicepayment`,
        method: "PUT",
        params: { invoicePaymentId: queryArg.invoicePaymentId },
      }),
    }),
    getInvoiceGetinvoice: build.query<
      GetInvoiceGetinvoiceApiResponse,
      GetInvoiceGetinvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/getinvoice`,
        params: { invoiceId: queryArg.invoiceId },
      }),
    }),
    getInvoiceGetinvoice2: build.query<
      GetInvoiceGetinvoice2ApiResponse,
      GetInvoiceGetinvoice2ApiArg
    >({
      query: (queryArg) => ({
        url: `/invoice/getinvoice2`,
        params: { invoiceId: queryArg.invoiceId },
      }),
    }),
    postNotificationNotifypdf: build.mutation<
      PostNotificationNotifypdfApiResponse,
      PostNotificationNotifypdfApiArg
    >({
      query: (queryArg) => ({
        url: `/notification/notifypdf`,
        method: "POST",
        body: queryArg.body,
        params: {
          caseId: queryArg.caseId,
          documentName: queryArg.documentName,
        },
      }),
    }),
    putUserCredentialslogin: build.mutation<
      PutUserCredentialsloginApiResponse,
      PutUserCredentialsloginApiArg
    >({
      query: (queryArg) => ({
        url: `/user/credentialslogin`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    postUserTokenlogin: build.mutation<
      PostUserTokenloginApiResponse,
      PostUserTokenloginApiArg
    >({
      query: () => ({ url: `/user/tokenlogin`, method: "POST" }),
    }),
    postUserRegister: build.mutation<
      PostUserRegisterApiResponse,
      PostUserRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/user/register`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getUserAuthorizedrequestblabla: build.query<
      GetUserAuthorizedrequestblablaApiResponse,
      GetUserAuthorizedrequestblablaApiArg
    >({
      query: () => ({ url: `/user/authorizedrequestblabla` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userApiGen2 };
export type GetCaseGetcasescontextApiResponse =
  /** status 200 Success */ CaseContextDtoRead;
export type GetCaseGetcasescontextApiArg = void;
export type PostCaseCreatenewcaseApiResponse =
  /** status 200 Success */ GetCaseResponse;
export type PostCaseCreatenewcaseApiArg = {
  clientId?: string;
};
export type PutCaseSavecaseApiResponse = unknown;
export type PutCaseSavecaseApiArg = {
  body: CaseDto;
};
export type PutCaseUpdatelawyerApiResponse = unknown;
export type PutCaseUpdatelawyerApiArg = {
  body: LawyerDto;
};
export type PutCaseAddclientApiResponse = /** status 200 Success */ string;
export type PutCaseAddclientApiArg = void;
export type PutCaseUpdateclientApiResponse = unknown;
export type PutCaseUpdateclientApiArg = {
  body: ClientDto;
};
export type GetCaseCreatecaseparticipantApiResponse =
  /** status 200 Success */ string;
export type GetCaseCreatecaseparticipantApiArg = {
  caseId?: string;
};
export type GetCaseUpdatecaseparticipantApiResponse = unknown;
export type GetCaseUpdatecaseparticipantApiArg = {
  body: CaseParticipantDto;
};
export type DeleteCaseRemovecaseparticipantApiResponse = unknown;
export type DeleteCaseRemovecaseparticipantApiArg = {
  body: string;
};
export type GetCaseAuthorizedrequestApiResponse = unknown;
export type GetCaseAuthorizedrequestApiArg = void;
export type PostFileUploadfileApiResponse = unknown;
export type PostFileUploadfileApiArg = {
  body: {
    ContentType?: string;
    ContentDisposition?: string;
    Headers?: {
      [key: string]: string[];
    };
    Length?: number;
    Name?: string;
    FileName?: string;
  };
};
export type GetInvoiceAccountClientidByClientIdApiResponse =
  /** status 200 Success */ AccountStatementDto;
export type GetInvoiceAccountClientidByClientIdApiArg = {
  clientId: string;
};
export type GetInvoiceGettrustclientcarddtoClientidByClientIdApiResponse =
  /** status 200 Success */ TrustClientCardDto;
export type GetInvoiceGettrustclientcarddtoClientidByClientIdApiArg = {
  clientId: string;
};
export type PostInvoiceCreateinvoiceApiResponse =
  /** status 200 Success */ string;
export type PostInvoiceCreateinvoiceApiArg = {
  caseId?: string;
};
export type PutInvoiceUpdateinvoiceApiResponse = unknown;
export type PutInvoiceUpdateinvoiceApiArg = {
  body: InvoiceDto;
};
export type PutInvoiceArchiveinvoiceApiResponse = unknown;
export type PutInvoiceArchiveinvoiceApiArg = {
  invoiceId?: string;
};
export type PostInvoiceCreateactivityApiResponse =
  /** status 200 Success */ string;
export type PostInvoiceCreateactivityApiArg = {
  invoiceId?: string;
  isDisburse?: boolean;
  isTaxable?: boolean;
};
export type PutInvoiceUpdateactivityApiResponse = unknown;
export type PutInvoiceUpdateactivityApiArg = {
  body: ActivityDto;
};
export type PutInvoiceRemoveactivityApiResponse = unknown;
export type PutInvoiceRemoveactivityApiArg = {
  activityId?: string;
};
export type PostInvoiceCreatebillingelementApiResponse =
  /** status 200 Success */ string;
export type PostInvoiceCreatebillingelementApiArg = {
  lawyerId?: string;
};
export type PostInvoiceUpdatebillingelementApiResponse = unknown;
export type PostInvoiceUpdatebillingelementApiArg = {
  body: BillingElementDto;
};
export type PostInvoiceDeletebillingelementApiResponse = unknown;
export type PostInvoiceDeletebillingelementApiArg = {
  billingElementId?: string;
};
export type PostInvoiceAddfundstotrustApiResponse = unknown;
export type PostInvoiceAddfundstotrustApiArg = {
  clientId?: string;
};
export type PutInvoiceUpdatetrustpaymentApiResponse = unknown;
export type PutInvoiceUpdatetrustpaymentApiArg = {
  body: TrustPaymentDto;
};
export type DeleteInvoiceRemovetrustpaymentApiResponse = unknown;
export type DeleteInvoiceRemovetrustpaymentApiArg = {
  trustPaymentId?: string;
};
export type PutInvoiceAddinvoicepaymentApiResponse =
  /** status 200 Success */ string;
export type PutInvoiceAddinvoicepaymentApiArg = {
  invoiceId?: string;
};
export type PutInvoiceUpdateinvoicepaymentApiResponse = unknown;
export type PutInvoiceUpdateinvoicepaymentApiArg = {
  body: InvoicePaymentDto;
};
export type PutInvoiceRemoveinvoicepaymentApiResponse = unknown;
export type PutInvoiceRemoveinvoicepaymentApiArg = {
  invoicePaymentId?: string;
};
export type GetInvoiceGetinvoiceApiResponse = /** status 200 Success */ Blob;
export type GetInvoiceGetinvoiceApiArg = {
  invoiceId?: string;
};
export type GetInvoiceGetinvoice2ApiResponse = /** status 200 Success */ Blob;
export type GetInvoiceGetinvoice2ApiArg = {
  invoiceId?: string;
};
export type PostNotificationNotifypdfApiResponse =
  /** status 200 Success */ Blob;
export type PostNotificationNotifypdfApiArg = {
  caseId?: string;
  documentName?: string;
  body: {
    pdf?: Blob;
  };
};
export type PutUserCredentialsloginApiResponse =
  /** status 200 Success */ LoginResult;
export type PutUserCredentialsloginApiArg = {
  body: LoginRequest;
};
export type PostUserTokenloginApiResponse = unknown;
export type PostUserTokenloginApiArg = void;
export type PostUserRegisterApiResponse = unknown;
export type PostUserRegisterApiArg = {
  body: RegisterRequest;
};
export type GetUserAuthorizedrequestblablaApiResponse = unknown;
export type GetUserAuthorizedrequestblablaApiArg = void;
export type RoleTypes = "Admin" | "Normal";
export type UserDto = {
  name?: string | null;
  lawyerId?: string;
  roles?: RoleTypes[] | null;
  id: string;
};
export type BillingElementDto = {
  activityName?: string | null;
  amount?: number;
  isHourlyRate?: boolean;
  isDisburse?: boolean;
  isInvoiceSpecific?: boolean;
  id: string;
};
export type CourtRoles =
  | "DeterminedByCase"
  | "Intimated"
  | "PutInCause"
  | "Plaintiff"
  | "Defender"
  | "PlaintiffLawyer"
  | "DefenderLawyer";
export type Genders = "Male" | "Female";
export type LawyerDto = {
  courtLockerNumber?: string | null;
  billsEmittedCount?: number;
  defaultHourlyElement?: BillingElementDto | null;
  billingElements?: BillingElementDto[] | null;
  notificationEmail?: string | null;
  courtRole?: CourtRoles;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  id: string;
};
export type LawyerDtoRead = {
  courtLockerNumber?: string | null;
  billsEmittedCount?: number;
  defaultHourlyElement?: BillingElementDto | null;
  billingElements?: BillingElementDto[] | null;
  notificationEmail?: string | null;
  fullName?: string | null;
  courtRole?: CourtRoles;
  isNotifiable?: boolean;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  lowerCaseFormattedFullName?: string | null;
  uppercaseFormattedFullName?: string | null;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  genderedName?: string | null;
  id: string;
};
export type TrustPaymentDto = {
  amount?: number;
  date?: string | null;
  id: string;
};
export type TrustWithdrawDto = {
  amount?: number;
  date?: string;
  id: string;
};
export type TrustClientCardDto = {
  clientId?: string;
  payments?: TrustPaymentDto[] | null;
  withdraws?: TrustWithdrawDto[] | null;
  id: string;
};
export type CaseParticipantDto = {
  notificationEmail?: string | null;
  courtRole?: CourtRoles;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  id: string;
};
export type CaseParticipantDtoRead = {
  notificationEmail?: string | null;
  fullName?: string | null;
  courtRole?: CourtRoles;
  isNotifiable?: boolean;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  lowerCaseFormattedFullName?: string | null;
  uppercaseFormattedFullName?: string | null;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  genderedName?: string | null;
  id: string;
};
export type CourtMemberBase = {
  notificationEmail?: string | null;
  courtRole?: CourtRoles;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  id: string;
};
export type CourtMemberBaseRead = {
  notificationEmail?: string | null;
  fullName?: string | null;
  courtRole?: CourtRoles;
  isNotifiable?: boolean;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  lowerCaseFormattedFullName?: string | null;
  uppercaseFormattedFullName?: string | null;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  genderedName?: string | null;
  id: string;
};
export type InvoiceStatuses =
  | "InPreparation"
  | "PartiallyPaid"
  | "Paid"
  | "Late"
  | "Cancelled";
export type InvoicePaymentDto = {
  amountPaid?: number;
  amoundPaidDate?: string | null;
  isPaymentComingFromTrust?: boolean;
  method?: string | null;
  id: string;
};
export type InvoiceSummation = {
  hourlyRatesCostTotal?: number;
  disbursesTaxableTotal?: number;
  disbursesNonTaxableTotal?: number;
  tpsTax?: number;
  tvqTax?: number;
  taxableFeesCost?: number;
  invoiceTotal?: number;
  paymentsTotal?: number;
  balance?: number;
  taxableSubtotal?: number;
};
export type ActivityDto = {
  created?: string;
  quantity?: number;
  description?: string | null;
  costInDollars?: number;
  totalCost?: number;
  isDisburse?: boolean;
  isTaxable?: boolean;
  createdAt?: string;
  id: string;
};
export type InvoiceDto = {
  invoiceStatus?: InvoiceStatuses;
  payments?: InvoicePaymentDto[] | null;
  availableBillingElementsForInvoice?: BillingElementDto[] | null;
  invoiceSummation?: InvoiceSummation | null;
  activities?: ActivityDto[] | null;
  hourlyActivities?: ActivityDto[] | null;
  taxableDisburses?: ActivityDto[] | null;
  nonTaxableDisburses?: ActivityDto[] | null;
  invoiceNumber?: number;
  id: string;
};
export type ChamberNames = "Family" | "Youth";
export type CourtTypes = "Superior" | "Quebec";
export type CaseDto = {
  managerLawyer?: LawyerDto | null;
  client?: ClientDto | null;
  participants?: CaseParticipantDto[] | null;
  defender?: CourtMemberBase | null;
  plaintiff?: CourtMemberBase | null;
  invoices?: InvoiceDto[] | null;
  clientRoleInCase?: CourtRoles;
  districtName?: string | null;
  courtAffairNumber?: string | null;
  caseNumber?: string | null;
  chamberName?: ChamberNames;
  courtTypes?: CourtTypes;
  courtNumber?: number;
  id: string;
};
export type CaseDtoRead = {
  managerLawyer?: LawyerDtoRead | null;
  client?: ClientDto | null;
  participants?: CaseParticipantDtoRead[] | null;
  defender?: CourtMemberBaseRead | null;
  plaintiff?: CourtMemberBaseRead | null;
  invoices?: InvoiceDto[] | null;
  clientRoleInCase?: CourtRoles;
  districtName?: string | null;
  courtAffairNumber?: string | null;
  caseNumber?: string | null;
  chamberName?: ChamberNames;
  courtTypes?: CourtTypes;
  courtNumber?: number;
  id: string;
};
export type ClientDto = {
  trustClientCard?: TrustClientCardDto | null;
  cases?: CaseDto[] | null;
  notificationEmail?: string | null;
  courtRole?: CourtRoles;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  id: string;
};
export type ClientDtoRead = {
  trustClientCard?: TrustClientCardDto | null;
  cases?: CaseDtoRead[] | null;
  notificationEmail?: string | null;
  fullName?: string | null;
  courtRole?: CourtRoles;
  isNotifiable?: boolean;
  mustNotify?: boolean;
  firstName?: string | null;
  lastName?: string | null;
  postalCode?: string | null;
  country?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  mobilePhoneNumber?: string | null;
  workPhoneNumber?: string | null;
  homePhoneNumber?: string | null;
  hasJuridicalAid?: boolean;
  postalCase?: string | null;
  fax?: string | null;
  gender?: Genders;
  lowerCaseFormattedFullName?: string | null;
  uppercaseFormattedFullName?: string | null;
  dateOfBirth?: string;
  socialSecurityNumber?: string | null;
  genderedName?: string | null;
  id: string;
};
export type CaseContextDto = {
  user?: UserDto | null;
  lawyer?: LawyerDto | null;
  clients?: ClientDto[] | null;
};
export type CaseContextDtoRead = {
  user?: UserDto | null;
  lawyer?: LawyerDtoRead | null;
  clients?: ClientDtoRead[] | null;
  cases?: CaseDtoRead[] | null;
};
export type GetCaseResponse = {
  createdId?: string;
};
export type AccountStatementDto = {
  availableBillingElements?: BillingElementDto[] | null;
  invoices?: InvoiceDto[] | null;
  id: string;
};
export type LoginResult = {
  token?: string | null;
  userDto?: UserDto | null;
};
export type LoginRequest = {
  username?: string | null;
  password?: string | null;
};
export type RegisterRequest = {
  username?: string | null;
  password?: string | null;
  role?: RoleTypes;
};
export const {
  useGetCaseGetcasescontextQuery,
  usePostCaseCreatenewcaseMutation,
  usePutCaseSavecaseMutation,
  usePutCaseUpdatelawyerMutation,
  usePutCaseAddclientMutation,
  usePutCaseUpdateclientMutation,
  useGetCaseCreatecaseparticipantQuery,
  useGetCaseUpdatecaseparticipantQuery,
  useDeleteCaseRemovecaseparticipantMutation,
  useGetCaseAuthorizedrequestQuery,
  usePostFileUploadfileMutation,
  useGetInvoiceAccountClientidByClientIdQuery,
  useGetInvoiceGettrustclientcarddtoClientidByClientIdQuery,
  usePostInvoiceCreateinvoiceMutation,
  usePutInvoiceUpdateinvoiceMutation,
  usePutInvoiceArchiveinvoiceMutation,
  usePostInvoiceCreateactivityMutation,
  usePutInvoiceUpdateactivityMutation,
  usePutInvoiceRemoveactivityMutation,
  usePostInvoiceCreatebillingelementMutation,
  usePostInvoiceUpdatebillingelementMutation,
  usePostInvoiceDeletebillingelementMutation,
  usePostInvoiceAddfundstotrustMutation,
  usePutInvoiceUpdatetrustpaymentMutation,
  useDeleteInvoiceRemovetrustpaymentMutation,
  usePutInvoiceAddinvoicepaymentMutation,
  usePutInvoiceUpdateinvoicepaymentMutation,
  usePutInvoiceRemoveinvoicepaymentMutation,
  useGetInvoiceGetinvoiceQuery,
  useGetInvoiceGetinvoice2Query,
  usePostNotificationNotifypdfMutation,
  usePutUserCredentialsloginMutation,
  usePostUserTokenloginMutation,
  usePostUserRegisterMutation,
  useGetUserAuthorizedrequestblablaQuery,
} = injectedRtkApi;
