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
    timezone: string
}

interface Connection {
    tutor: string,
    student: string
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
    onChange: (event: React.ChangeEvent) => void,
    multiple: boolean,
}

export interface HeaderProps {
    authenticated: boolean,
    user: string,
    hasProfile: boolean,
}
