import { useState } from "react"
import { player1, player2 } from "./Constants"
import { playerSliderProps } from "./Interfaces"



export function RangeSlider({ x, y, player, parameter, min, max }: playerSliderProps) {
	let [par, setPar] = useState(min)
	return (
		<div style={{ position: "fixed", left: x, top: y }}>
			<p style={{ display: "block", marginTop: 0, marginBottom: 5 }}>{[parameter]}</p>
			<input type="range" min={min} max={max} value={par}
				onChange={(event) => {
					setPar(Number(event.target.value))
				}} />
			<button type="button"
				onClick={() => {
					if (player.team == 1) {
						if (parameter == 'Speed') {
							player1.dy = player1.dy > 0 ? par : -par
						}
						else if (parameter == 'Aspd') {
							player1.aspd = par
							console.log(par)
						}
					}
					if (player.team == 2) {
						if (parameter == 'Speed') {
							player2.dy = player2.dy > 0 ? par : -par
						}
						else if (parameter == 'Aspd') {
							player2.aspd = par
						}
					}
				}}>Ok</button>
		</div>
	)
}