import { useState } from 'react';
import { Cog } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function Home() {
  const [text, setText] = useState(
    'https://www.youtube.com/watch?v=X_Hw9P1iZfQ',
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      window.electronAPI.runCommand({
        command: 'yt-dlp',
        args: [
          '--cookies-from-browser',
          'chrome',
          '-f',
          '399',
          '-r',
          '5k',
          text,
        ],
      });
      window.electronAPI.onCommandOutput((output) => {
        console.log(output);
      });
      window.electronAPI.onCommandStopped((data) => {
        console.log(data);
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f1] flex flex-col items-center">
      <div className="container px-4 sm:px-6 lg:px-8 py-16 lg:py-32 max-w-4xl mx-auto">
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.length <= 0) return;
            onSubmit();
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-[#E50914] to-[#FF5722] text-transparent bg-clip-text">
              Search and Download
            </span>
          </h1>

          <div className="relative">
            <Textarea
              id="text"
              name="text"
              value={text}
              minLength={1}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=X_Hw9P1iZfQ"
              className="w-full px-4 py-3 bg-[#ffffff] text-gray-900 border-2 border-[#cccccc] rounded-lg focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all duration-200 font-mono text-sm placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading || text.length <= 0}
            className={`mt-6 w-full h-12 flex justify-center items-center rounded-lg text-lg font-medium transition-all duration-200
              ${
                text.length <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#E50914] text-white hover:bg-[#F40612] active:bg-[#B2070E]'
              } 
              ${loading ? 'animate-pulse' : ''}`}
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <>
                  <Cog className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                'run yt-dlp'
              )}
            </span>
          </button>
        </form>
        <Button
          className="mt-6 w-full h-12 flex justify-center items-center rounded-lg text-lg font-medium transition-all duration-200 
              bg-[#E50914] text-white hover:bg-[#F40612] active:bg-[#B2070E]"
          onClick={() => window.electronAPI.killCommand()}
        >
          kill yt-dlp
        </Button>
      </div>
    </div>
  );
}
