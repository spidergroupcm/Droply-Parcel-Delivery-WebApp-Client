import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { imageUpload } from '../../api/utils';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
    const { updateProfileData, user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Form submitted');

        const form = e.target;
        const name = form.name.value || user?.displayName;

        // User's existing photoURL if no image is uploaded
        const existingPhotoURL = user?.photoURL;

        const image = form.image.files[0];
        let photoURL;

        // Upload image only if a new image is selected
        if (image) {
            photoURL = await imageUpload(image);
        } else {
            photoURL = existingPhotoURL; // Use existing photo
        }

        // Update user profile
        updateProfileData(name, photoURL)
            .then(() => {
                // console.log('Profile updated successfully');

                // Update database with new profile data
                axiosPublic.patch(`/user/profileUpdate/${user?.email}`, { name, photo: photoURL })
                    .then(() => {
                        toast.success('Profile updated successfully');
                        navigate('/dashboard/my-profile');
                    })
                    .catch((error) => {
                        console.error('Error updating profile in database:', error);
                    });
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div>
            <div className="flex items-center mb-4 md:mb-10">
                {/* Form */}
                <div className="card mx-auto bg-base-100 w-full max-w-lg shrink-0 py-2 md:py-4 bg-[#1a494220] rounded-lg">
                    <h1 className="text-2xl text-center font-semibold">Update Your Profile</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                defaultValue={user?.displayName}
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Image Field */}
                        <div>
                            <label htmlFor="image" className="block mb-2 text-sm">
                                Select Image:
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="form-control mt-2 grid grid-cols-2 gap-4 flex-row">
                            <Link to={'/dashboard/my-profile'} className="btn btn-neutral rounded-lg">Go Back</Link>
                            <button type="submit" className="btn btn-neutral rounded-lg">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
