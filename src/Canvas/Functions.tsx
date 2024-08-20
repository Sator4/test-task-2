import React from "react"
import { borderColor, borderThickness, bulletRadius, mainBgColor, playerRadius } from "./Constants"
import { Player, Bullet } from "./Interfaces"


export function Draw(context: CanvasRenderingContext2D, width: number, height: number, players: Player[], menuPos: number[] = [-1, -1]) {
	context.fillStyle = borderColor
	context.fillRect(0, 0, width, height)

	context.fillStyle = mainBgColor
	context.fillRect(
		borderThickness.left,
		borderThickness.top,
		width - borderThickness.right - borderThickness.left,
		height - borderThickness.bottom - borderThickness.top
	)

	let player1 = players[0]
	let player2 = players[1]

	context.beginPath()
	context.arc(player1.x, player1.y, playerRadius, 0, Math.PI * 2)
	context.fillStyle = player1.color
	context.fill()
	context.closePath()

	context.beginPath()
	context.arc(player2.x, player2.y, playerRadius, 0, Math.PI * 2)
	context.fillStyle = player2.color
	context.fill()
	context.closePath()

	for (let i = 0; i < player1.bullets.length; i++) {
		let b1 = player1.bullets[i]
		context.beginPath()
		context.arc(b1.x, b1.y, bulletRadius, 0, Math.PI * 2)
		context.fillStyle = player1.bulletColor
		context.fill()
		context.closePath()
	}
	for (let i = 0; i < player2.bullets.length; i++) {
		let b2 = player2.bullets[i]
		context.beginPath()
		context.arc(b2.x, b2.y, bulletRadius, 0, Math.PI * 2)
		context.fillStyle = player2.bulletColor
		context.fill()
		context.closePath()
	}
}

export function shoot(player: Player) {
	player.reload = 0
	// let aimVec: number[] = aimVector(player1Pos, player2Pos, player2Spd, bulletSpd)
	let bullet: Bullet = {
		x: player.x,
		y: player.y,
		dx: 5,
		dy: 0
	}
	if (player.team == 2)
		bullet.dx = -5
	player.bullets.push(bullet)
}

export function distance([x1, y1]: number[], [x2, y2]: number[]) {
	return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5
}


// function aimVector(shooterPos: number[], targetPos: number[], targetSpd: number[], bulletSpd: number){

// }
