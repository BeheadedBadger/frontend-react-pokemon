import "./PokemonInfoCard.css"

function PokemonInfoCard({nr, name, img, moves, weight, abilities}) {

return (
    <div className="card">
        <p>#{nr} {name}</p>
        <img src={img} alt={name}/>
        <p>Moves: {moves}</p>
        <p>Weight: {weight}lbs</p>
        <ul>Abilities:
            {abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>))}
        </ul>
    </div>)
}

export default PokemonInfoCard;
 /*   Ditto
    [afbeelding]
Moves: 146
Weight: 55
Abilities:
    cute-charm
competitive
friend-guard*/