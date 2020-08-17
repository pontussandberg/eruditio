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
    name: string,
    requests: Connection[],
    role: string,
    shortId: string,
    subjects: string,
    timezone: string,
    'last-name'?: string,
}

export interface ScnBtnProps {
    onClick: (event: React.MouseEvent) => void,
    text: string,
    classes: string
}

export interface ConItemProps {
    con: Con,
    children: React.ReactElement[],
}

interface Con {
    'last-name': string,
    name: string,
    requests: { student: string, tutor: string }[],
    shortId: string,
}

export interface FormHeaderProps {
    title: string,
    text: string,
    error: string,
}

export interface InputProps {
    label: string,
    name: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TutorCardProps {
    tutor: Profile,
    shortId: string,
    refresh: () => void,
}


interface Connection {
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

export interface Match {
    match: {params: {id: string}},
    history: Array<string>,
}

export interface DropDownProps {
    label: string,
    name: string,
    options: Array<{value: string, name: string}>,
    init: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    multiple?: boolean,
}

export interface HeaderProps {
    authenticated: boolean,
    user: string,
    hasProfile: boolean,
}
