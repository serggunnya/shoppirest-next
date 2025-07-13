export interface ILoginCredentials {
	email: string;
	password: string;
}

export interface IRegisterCredentials {
	fisrstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface IAddress {
	id: number;
	country: string;
	city: string;
	street: string;
	zip: string;
}

export interface IUser {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	role: string;
	language: string;
	currency: string;
	addresses: IAddress[];
}
