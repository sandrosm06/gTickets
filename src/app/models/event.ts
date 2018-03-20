export class Event{
	constructor(
		public idEvent: number,
		public name: string,
		public date: string,
		public isActive: string,
		public aforo: number,
		public Venue_idVenue: number
	){}
}