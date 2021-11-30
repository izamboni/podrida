const GameContext = createContext<GameContextType>({
  nroPlayers: null,
  players: [],
});

const GameContextProvider: React.FC = ({ children }) => {
  const [nroPlayers, setNroPlayers] = useState(null);
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (player: Player) => {
    setPlayers([...players, player]);
  };

  const removePlayer = (player: Player) => {
    setPlayers(players.filter((p) => p.id !== player.id));
  };

  const setNroPlayersHandler = (nroPlayers: number) => {
    setNroPlayers(nroPlayers);
  };

  return (
    <GameContext.Provider
      value={{
        nroPlayers,
        players,
        addPlayer,
        removePlayer,
        setNroPlayersHandler,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
