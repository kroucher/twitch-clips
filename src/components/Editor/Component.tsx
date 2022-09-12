import { useVideoConfig } from 'remotion';
export const MyComposition = () => {
    const { width, height, fps, durationInFrames } = useVideoConfig();
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f2511b',
                color: '#fff',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
            }}
        >
            <h1>
                My name is Isaac Okoro. A fullstack developer and technical writer for the OpenReplay blog
            </h1>
            <h3>
                This {width} * {height}px video is {durationInFrames / fps}secs long and
                was made to showcase Remotion
            </h3>
        </div>
    );
};