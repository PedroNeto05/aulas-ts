type VotationOption = {
  option: string;
  numberOfVotes: number;
};

class Votation {
  private _votationOptions: VotationOption[] = [];
  constructor(public details: string) {}

  addVotationOption(votationOption: VotationOption): void {
    this._votationOptions.push(votationOption);
  }

  vote(votationIndex: number): void {
    if (!this._votationOptions[votationIndex]) return;
    this._votationOptions[votationIndex].numberOfVotes += 1;
  }

  get votationOptions(): VotationOption[] {
    return this._votationOptions;
  }
}

class VotationApp {
  private votations: Votation[] = [];

  addVotation(votation: Votation): void {
    this.votations.push(votation);
  }

  showVotation(): void {
    for (const votation of this.votations) {
      console.log(votation.details);
      for (let i = 0; i < votation.votationOptions.length; i++) {
        console.log(
          `${i} - ${votation.votationOptions[i].option}:${votation.votationOptions[i].numberOfVotes}`,
        );
      }
      console.log('#############');
      console.log();
      console.log();
      console.log();
    }
  }
}

const votation1 = new Votation('Qual sua linguagem de programação favorita ?');
votation1.addVotationOption({ option: 'JS', numberOfVotes: 0 });
votation1.addVotationOption({ option: 'PY', numberOfVotes: 0 });
votation1.addVotationOption({ option: 'TS', numberOfVotes: 0 });

const votation2 = new Votation('Qual sua cor favorita ?');
votation2.addVotationOption({ option: 'Vermelho', numberOfVotes: 0 });
votation2.addVotationOption({ option: 'Branco', numberOfVotes: 0 });
votation2.addVotationOption({ option: 'Azul', numberOfVotes: 0 });

const votationApp = new VotationApp();

votationApp.addVotation(votation1);
votationApp.addVotation(votation2);

votationApp.showVotation();
