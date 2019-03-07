export class ExpenseReportLine {
  constructor(
    public lndfid: number, //id ligne note de frais
    public did: number, // id ndf
    public mid: number, // id mission
    public publishing_date: string, //date de la demande 
    public advance: boolean, // avance
    public amount: number, //montant
    public state: string, // statut
    public refusal_reason: string,
    public typeOfExpense: string, //Type de dépense
    public reasonOfRefund: string, //motif de remboursement 
    public dateOfOperation: string, //date de l'event mission
    public additionalDetail: string    
    ) {
  }
}