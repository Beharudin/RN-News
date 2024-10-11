import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { NewsDataType } from "@/types";

type Props = {};
const expoKey = process.env.EXPO_PUBLIC_API_KEY;

const Page = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  const { top: topSafe } = useSafeAreaInsets();

  const fetchNews = async () => {
    const url = `https://newsdata.io/api/1/news?apikey=${expoKey}&country=in&language=en&image=1&removeduplicate=1&size=5`;
    try {
      setLoading(true);
      const res = await axios.get(url);
      if (res && res.data) {
        setBreakingNews(res.data.results);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: topSafe }]}>
      <Header />
      <SearchBar />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
