"use client";

import { wrapper } from "@/libs/redux";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
	const { store } = wrapper.useWrappedStore(children);
	return <Provider store={store}>{children}</Provider>;
}
