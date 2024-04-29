import supabase from './supabase'; // Import the supabase client

async function fetchSocialMediaUserData(userId) {
  try {
    const { data, error } = await supabase
      .from('social_media_data')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return null;
  }
}

const extractUserIdFromURL = () => {
  const url = window.location.pathname;
  const segments = url.split('/');
  const userId = segments[segments.length - 1];
  return userId;
};

async function populateSocialMediaUrls() {
  const userId = extractUserIdFromURL();
  const userData = await fetchSocialMediaUserData(userId);
  if (userData) {
    const socialMediaUrls = {
      cardbackgroundImage: userData.card_background_image,
      avatar: userData.avatar,
      name: userData.name,
      designation: userData.designation,
      phone: userData.phone,
      whatsapp: userData.whatsapp,
      website: userData.website,
      facebook: userData.facebook,
      instagram: userData.instagram,
      youtube: userData.youtube,
      linkedin: userData.linkedin,
      googleReviews: userData.google_reviews,
      paytm: userData.paytm,
      email: userData.email,
      maps: userData.maps,
      backgroundImage: userData.background_image
    };
    return socialMediaUrls;
  } else {
    // Handle error or return default values
    return null;
  }
}

const socialMediaUrls = await populateSocialMediaUrls();
export default socialMediaUrls;
