import React, { useRef, useEffect, useState } from "react"
import { playerRadius, borderThickness, height, width, player1, player2 } from "./Constants"
import { shoot, distance, Draw } from "./Functions"
import { PlayerMenu } from "./PlayerMenu"
import { RangeSlider } from "./RangeSlider"




function Canvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	let STOP = false



	let mousePos = [0, 0]
	let mouseInside = false
	let menuPos = [-1, -1]


	let [left, setLeft] = React.useState(0)
	let [top, setTop] = React.useState(0)
	let [vis, setVis] = React.useState<DocumentVisibilityState>("hidden")
	let [clickedPlayer, setClickedPlayer] = React.useState(player1)
	let [player1Score, setPlayer1Score] = React.useState(0)
	let [player2Score, setPlayer2Score] = React.useState(0)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const context = canvas.getContext('2d')
		if (!context) return

		context.canvas.addEventListener(
			'mousemove',
			(event) => {
				mousePos = [event.clientX, event.clientY]
			})
		context.canvas.addEventListener(
			'click',
			(event) => {
				mousePos = [event.clientX, event.clientY]
				if (distance(mousePos, [player1.x, player1.y]) < playerRadius) {
					menuPos = mousePos
					setLeft(mousePos[0])
					setTop(mousePos[1])
					setVis("visible")
					setClickedPlayer(player1)
				}
				else if (distance(mousePos, [player2.x, player2.y]) < playerRadius) {
					menuPos = mousePos
					setLeft(mousePos[0] - 150)
					setTop(mousePos[1])
					setVis("visible")
					setClickedPlayer(player2)
				}
				else {
					setVis("hidden")
				}
				STOP = true
			}
		)

		const renderer = () => {
			if (STOP) return
			player1.y += player1.dy
			player2.y += player2.dy
			if (
				player1.y - playerRadius < borderThickness.top ||
				player1.y + playerRadius > height - borderThickness.bottom ||
				distance(mousePos, [player1.x, player1.y]) < playerRadius && player1.dy * (player1.y - mousePos[1]) < 0 && !mouseInside
			) {
				player1.dy *= -1
			}
			if (
				player2.y - playerRadius < borderThickness.top ||
				player2.y + playerRadius > height - borderThickness.bottom ||
				distance(mousePos, [player2.x, player2.y]) < playerRadius && player2.dy * (player2.y - mousePos[1]) < 0 && !mouseInside
			) {
				player2.dy *= -1
			}
			if (distance(mousePos, [player1.x, player1.y]) > playerRadius && distance(mousePos, [player2.x, player2.y]) > playerRadius)
				mouseInside = false
			else mouseInside = true


			for (let i = 0; i < player1.bullets.length; i++) {  		// bullet movement
				player1.bullets[i].x += player1.bullets[i].dx
				player1.bullets[i].y += player1.bullets[i].dy
				let posX = player1.bullets[i].x
				let posY = player1.bullets[i].y
				if (distance([posX, posY], [player2.x, player2.y]) < playerRadius) {
					setPlayer1Score(player1Score + 1)
					player1.score = player1Score
					player1.bullets.splice(i, 1)
					STOP = true
				}
				if (posX > width || posX < 0 || posY > height || posY < 0) {
					player1.bullets.splice(i, 1)
				}
			}

			for (let i = 0; i < player2.bullets.length; i++) {
				player2.bullets[i].x += player2.bullets[i].dx
				player2.bullets[i].y += player2.bullets[i].dy
				let posX = player2.bullets[i].x
				let posY = player2.bullets[i].y
				if (distance([posX, posY], [player1.x, player1.y]) < playerRadius) {
					setPlayer2Score(player2Score + 1)
					player2.score = player2Score
					player2.bullets.splice(i, 1)
					STOP = true
				}
				if (posX > width || posX < 0 || posY > height || posY < 0) {
					player2.bullets.splice(i, 1)
				}
			}

			player1.reload < player1.aspd ? player1.reload++ : shoot(player1)
			player2.reload < player2.aspd ? player2.reload++ : shoot(player2)

			Draw(context, width, height, [player1, player2], menuPos)
			window.requestAnimationFrame(renderer)

		}
		renderer()
	})

	return <div>
		<canvas ref={canvasRef} height={height} width={width} style={{ position: "fixed" }} />
		<PlayerMenu x={left} y={top} visibility={vis} player={clickedPlayer} />
		<RangeSlider parameter={'Speed'} min={0} max={10} x={100} y={height - 130} player={player1} />
		<RangeSlider parameter={'Aspd'} min={10} max={100} x={100} y={height - 80} player={player1} />

		<RangeSlider parameter={'Speed'} min={0} max={10} x={width - 200} y={height - 130} player={player2} />
		<RangeSlider parameter={'Aspd'} min={10} max={100} x={width - 200} y={height - 80} player={player2} />

		<p style={{ position: 'fixed', fontSize: 25, left: 50, fontWeight: "bold" }}>Player 1 score: {player1Score}</p>
		<p style={{ position: 'fixed', fontSize: 25, left: width - 200, fontWeight: "bold" }}>Player 2 score: {player2Score}</p>
	</div>

	return <canvas ref={canvasRef} height={height} width={width} style={{ position: "fixed" }} />
}


export default Canvas