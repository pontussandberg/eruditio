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
    'last-name': string,
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
    onChange: (event: React.FormEvent),
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

