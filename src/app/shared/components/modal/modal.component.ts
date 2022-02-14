import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  closeIcon: unknown = faWindowClose;

  @Input() title: string;
  @Input() message: string;
  @Input() okButtonText: string;
  @Input() cancelButtonText: string;
  @Input() modalOpen: boolean;

  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  allow(): void {
    this.confirm.emit(true);
  }

  deny(): void {
    this.confirm.emit(false);
  }

}
