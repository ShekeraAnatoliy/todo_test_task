import { Provider } from 'react-redux';
import '../styles/index.css';
import type { AppProps } from 'next/app';
import { store } from '@/store/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
