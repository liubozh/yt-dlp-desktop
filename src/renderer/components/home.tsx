import { Cog } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useAtom } from 'jotai';
import { isRunningAtom, downloadUrlAtom, outputsAtom } from '../atoms';
import { ScrollArea } from './ui/scroll-area';

export default function Home() {
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const [downloadUrl, setDownloadUrl] = useAtom(downloadUrlAtom);
  const [outputs, setOutputs] = useAtom(outputsAtom);

  const onSubmit = async () => {
    try {
      setIsRunning(true);
      window.electronAPI.runCommand({
        command: 'yt-dlp',
        args: [
          '--cookies-from-browser',
          'chrome',
          '-f',
          'bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b',
          '-o',
          '~/yt-dlp-desktop/%(title)s [%(id)s].%(ext)s',
          downloadUrl,
        ],
      });
      window.electronAPI.onCommandOutput((output) => {
        setOutputs((prev) => [...prev, output]);
      });
      window.electronAPI.onCommandStopped((data) => {
        setOutputs((prev) => [...prev, JSON.stringify(data)]);
        setIsRunning(false);
      });
    } catch (e) {
      console.error(e);
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="container px-4 py-16 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-red-600">
          Search and Download
        </h1>

        <div className="flex items-center justify-center space-x-2">
          <Input
            id="text"
            name="text"
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            className="px-4 py-2 border rounded-lg"
            style={{ width: '300px' }}
          />
          <Button
            disabled={isRunning || downloadUrl.length <= 0}
            className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200
              ${
                downloadUrl.length <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
              } 
              ${isRunning ? 'animate-pulse' : ''}`}
            onClick={onSubmit}
          >
            {isRunning ? (
              <>
                <Cog className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'run yt-dlp'
            )}
          </Button>
          <Button
            className="px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 bg-red-600 text-white hover:bg-red-700 active:bg-red-800"
            onClick={() => window.electronAPI.killCommand()}
          >
            kill yt-dlp
          </Button>
        </div>
        <ScrollArea className="h-72 mt-8 w-full max-w-4xl mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
          {outputs.map((output, index) => (
            <div key={index} className="text-left text-sm text-gray-800 mb-2">
              {output}
            </div>
          ))}
          <div
            ref={(el) => {
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
