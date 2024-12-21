import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDiscoverUsers } from '../hooks/useDiscoverUsers';
import { useLikes } from '../hooks/useLikes';
import { colors } from '../utils/colors';

const DiscoverScreen = () => {
  const { users, loading, error, fetchUsers } = useDiscoverUsers();
  const { likedUsers, getLikedUsers, likeUser, unlikeUser } = useLikes();

  useEffect(() => {
    fetchUsers();
    getLikedUsers();
  }, []);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const isUserLiked = (userId) => {
    return likedUsers.some(likedUser => likedUser._id === userId);
  };

  const handleLikeToggle = async (userId) => {
    if (isUserLiked(userId)) {
      const success = await unlikeUser(userId);
      if (success) {
        console.log(`Unliked user with ID: ${userId}`);
      }
    } else {
      const success = await likeUser(userId);
      if (success) {
        console.log(`Liked user with ID: ${userId}`);
      }
    }
  };

  const renderUserCard = ({ item }) => {
    const liked = isUserLiked(item._id);
    
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={styles.age}>Age: {calculateAge(item.dateOfBirth)}</Text>
        <Text style={styles.bio}>Bio: {item.preference?.bio || 'No bio available.'}</Text>
        <Button 
          title={liked ? "Unlike" : "Like"}
          onPress={() => handleLikeToggle(item._id)}
          color={liked ? colors.secondary : colors.primary}
        />
      </View>
    );
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <FlatList
      data={users}
      renderItem={renderUserCard}
      keyExtractor={(item) => item._id}
      onRefresh={fetchUsers}
      refreshing={loading}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    fontSize: 14,
    marginVertical: 8,
  },
});

export default DiscoverScreen;