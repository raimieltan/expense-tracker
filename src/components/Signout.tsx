import { useRouter } from 'next/navigation';

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = () => {

    localStorage.clear();

    router.push('/');
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 ease-in-out"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
