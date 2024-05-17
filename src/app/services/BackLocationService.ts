import {Component} from '@angular/core';
import {Location} from '@angular/common';

export class BackLocationService {

  constructor(private _location: Location)
  {}

  backClicked() {
    this._location.back();
  }
}
