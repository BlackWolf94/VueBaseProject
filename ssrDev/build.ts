import webpack from 'webpack';
import {WpClient} from './webpack/client.conf';
import WpServe from './webpack/server.conf';

const clientCompiler = webpack(WpClient);
clientCompiler.run(() => {
    console.error('Client build Complete');
    const serverCompiler = webpack(WpServe);
    serverCompiler.run((err) => {
        if (err) {
            console.error(err);
        }
        console.error('server build Complete');
    });

});
