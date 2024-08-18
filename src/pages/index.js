import {Game} from "@/components/game";

export default function Home() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#ddd',
            display: 'flex',
            justifyContent: 'center',
        }}>
           <Game />
        </div>
    );
}
