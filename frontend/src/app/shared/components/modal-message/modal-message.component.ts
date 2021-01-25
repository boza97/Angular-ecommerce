import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
