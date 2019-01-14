export class UsersService {
  prenom = 'Didier';
  nom    = 'LEBLANC';
  mail   = 'didier.leblanc@polytech.com';
  service = 'RH';
  account_type = 'Collaborateur'; //Can be Chef or Collaborateur
  notified = true;
  notifications = ["Congés validés (CDS)", "Affectation mission (E6835)", "Congés validés (RH)"];

  disconnect() {
  }

}
