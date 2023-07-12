import Link from 'next/link';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <div>
      <div>
        <h2>Nav</h2>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link href='/dashboard/profile'>Profile</Link>
        </li>
        <li>
          <Link href='/login'>Login</Link>
        </li>
      </div>
    </div>
  );
};

export default Navigation;
