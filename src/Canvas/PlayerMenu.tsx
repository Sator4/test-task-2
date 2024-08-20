
import { useState } from "react"
import { player1, player2 } from "./Constants"
import { playerMenuProps } from "./Interfaces"
import './styles.css'


export function PlayerMenu({ x, y, visibility, player }: playerMenuProps) {
	// console.log('menu')
	let [bulletColor, setBulletColor] = useState('#ff0000')
	let [bulletColorVisibility, setBulletColorVisibility] = useState<DocumentVisibilityState>('hidden')
	return (
		<div className={visibility} style={{ position: 'fixed', left: x, top: y }}>
			<select id="dropdown" value=''
				onChange={(event) => {
					if (event.target.value == 'spellColor') {
						setBulletColorVisibility('visible')
					}
					// setBulletColorVisibility('hidden')
					console.log(bulletColorVisibility)
				}}>
				<option value="Options"></option>
				<option value="spellColor">Change player spell color</option>
			</select >
			<input type="color" id="bulletColor" className={bulletColorVisibility} value={bulletColor} onChange={(event) => {
				setBulletColor(event.target.value)
			}} />
			<button type="button" id="bulletcolorSubmit" className={bulletColorVisibility}
				onClick={() => {
					if (player.team == 1) {
						player1.bulletColor = bulletColor
					}
					else if (player.team == 2) {
						player2.bulletColor = bulletColor
					}
					setBulletColorVisibility('hidden')
				}}>Ok
			</button>
		</div>
	)
}