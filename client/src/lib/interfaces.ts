export interface AuthProps {
    authenticated: boolean
}

export interface ButtonProps {
    onClick: (event: React.MouseEvent) => void,
    text?: string,
    classes?: string
}

export interface ButtonLinkProps {
    text: string,
    path: string,
    classes?: string
}

export interface Profile {
    about: string,
    connections: Connection[],
    contact: string,
    hasProfile: boolean,
    languages: string,
    lastName: string,
    'last-name'?: string,
    name: string,
    requests: Connection[],
    role: string,
    shortId: string,
    subjects: string,
    timezone: string
}

export interface Connection {
    tutor: string,
    student: string
}

export interface ScnBtnLinkProps {
    path: string,
    text?: string,
    classes?: string,
}

export interface ConnectedPerson {
    'last-name': string,
    name: string,
    shortId: string,
    relation: string
}

export interface ConnectionList {
    connections: ConnectedPerson[],
    outgoing: ConnectedPerson[],
    incoming: ConnectedPerson[],
    rooms: Room[]
}

export interface ConnectionsProps {
    authenticated: boolean,
    profile: Profile
}

export interface Room {
    id: string,
    tutor: string,
    student: string
}

export interface UserPageProps {
    match: {
        params: {
            id: string
        }
    }
}
