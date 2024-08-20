export interface canvasProps {
	width: number,
	height: number
}

export interface playerMenuProps {
	x: number,
	y: number,
	visibility: DocumentVisibilityState,
	player: Player
}
export interface playerSliderProps {
	x: number,
	y: number,
	player: Player,
	parameter: string,
	min: number,
	max: number
}

export interface Bullet {
	x: number
	y: number
	dx: number
	dy: number
}

export interface Player {
	team: number
	color: string
	x: number
	y: number
	dx: number
	dy: number
	aspd: number
	reload: number
	bullets: Bullet[]
	bulletColor: string
	score: number
}