import { Player } from "./Interfaces"

export const mainBgColor = '#40c0d0'
export const borderColor = '#1090a0'

export const width = window.innerWidth
export const height = window.innerHeight

export const playerRadius = 50
export const borderThickness = {
	top: 60,
	bottom: 150,
	left: 10,
	right: 10
}

export const bulletRadius = 10
export const bulletSpd = 5


export let player1: Player = {
	team: 1,
	color: '#ff3333',
	x: 100,
	y: 200,
	dx: 0,
	dy: 0,
	bullets: [],
	aspd: 80,
	reload: 0,
	bulletColor: '#772222',
	score: 0
}
export let player2: Player = {
	team: 2,
	color: '#3333ff',
	x: width - 100,
	y: height - 200,
	dx: 0,
	dy: 0,
	bullets: [],
	aspd: 80,
	reload: 0,
	bulletColor: '#222277',
	score: 0
}