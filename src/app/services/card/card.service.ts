import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Card } from '../../components/card/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private _selectedCardInfo: Subject<Card> = new Subject();
  selectedCardInfo$: Observable<Card> = this._selectedCardInfo.asObservable();

  constructor() {}

  setCardData(cardData: Card) {
    this._selectedCardInfo.next(cardData);
  }
}
