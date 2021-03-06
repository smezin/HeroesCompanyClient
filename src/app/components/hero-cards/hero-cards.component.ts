import { Component, OnInit } from '@angular/core';
import { HeroCard } from 'src/app/entities/heroCard';
import { AuthService } from 'src/app/services/auth.service';
import { HeroCardsDalService } from 'src/app/services/hero-cards-dal.service';
import { TrainHeroService } from 'src/app/services/train-hero.service';

@Component({
  selector: 'app-hero-cards',
  templateUrl: './hero-cards.component.html',
  styleUrls: ['./hero-cards.component.css']
})
export class HeroCardsComponent implements OnInit {
  heroCards: HeroCard[] = [];
  trainerId: string;
  
  constructor(
    public heroCardsDalService: HeroCardsDalService, 
    private authService: AuthService,
    private trainHeroService: TrainHeroService) { }

  ngOnInit(): void {
    this.authService.getUserStatus.subscribe(user => {
      this.trainerId = user.id;
      this.getCards();
    });
  }
  onTrainHero (id: string) : void {      
    this.heroCardsDalService.getHeroCardById(id).subscribe(hero => 
      {        
        const updatedHeroCard : HeroCard = this.trainHeroService.trainHero(hero);
        this.heroCardsDalService.updateHeroCard(this.trainerId, updatedHeroCard).subscribe(); 
        const index = this.heroCards.findIndex(hc => hc.id === id);
        this.heroCards[index] = updatedHeroCard;  
        this.sortHeroCards();          
      }
    );   
  }
  private getCards () : void {
    this.heroCardsDalService.getHeroCardsByTrainerId(this.trainerId)
    .subscribe(heroCards => {
      this.heroCards = heroCards;
      this.sortHeroCards();
    });
  }
  //sort by current power, desending
  private sortHeroCards() : void {
    this.heroCards.sort((a, b) => {
      return +b.currentPower - +a.currentPower;
    });
  }
}
