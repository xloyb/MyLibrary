"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Service {
  id: number;
  categoryId: number;
  image: string;
  title: string;
  description: string;
  price: number;
  amount: number;
  buyOrSellType: string;
  ShoppyCode: string;
  ShoppyCodeNoCrypto: string;
}

interface Props {
  categories: Category[];
  services: Service[];
}

function ServiceTabs({ categories, services }: Props) {
  const [activeCategory, setActiveCategory] = useState<number | null>(categories[0]?.id || null);

  const renderServicesForCategory = (categoryId: number) => {
    return services.filter(service => service.categoryId === categoryId).map(service => (
      <div key={service.id} className="mt-6 card card-compact shadow-xl w-auto m-2 bg-base-100">
        <figure>
          <div style={{ width: '100%', position: 'relative', paddingBottom: '56.25%' }}>
            <Image
              src={`/uploads/${service.image}`}
              alt={service.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{service.title}</h2>
          <p>{service.buyOrSellType}</p>
          <p>{service.ShoppyCode}</p>
          <p>{service.ShoppyCodeNoCrypto}</p>

          <div className="card-actions justify-end">
            <p className="text-lg font-bold leading-10">${service.price.toFixed(2)}</p>
            <Link href={`/c/`}>
              <button className="btn btn-primary">Order</button>
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="tabs tabs-lifted">
        {categories.map(category => (
          <a
            key={category.id}
            className={`tab tab-lifted ${activeCategory === category.id ? 'tab-active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </a>
        ))}
      </div>
      <div className='content-center bg-base-200 card mx-6 mt-5 md:pt-4 px-6'>
        <div className="content-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-200 card mx-6 mt-5 md:pt-4 px-6">
          {activeCategory && renderServicesForCategory(activeCategory)}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const categories = await fetchCategories();
  const services = await fetchServices();

  return {
    props: {
      categories,
      services,
    },
  };
}

// Dummy data fetching functions (replace with your real logic)
async function fetchCategories(): Promise<Category[]> {
  return [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ];
}

async function fetchServices(): Promise<Service[]> {
  return [
    {
      id: 1,
      categoryId: 1,
      image: 'service1.jpg',
      title: 'Service 1',
      description: 'Description for Service 1',
      price: 19.99,
      amount: 10,
      buyOrSellType: 'Buy',
      ShoppyCode: 'XYZ123',
      ShoppyCodeNoCrypto: 'XYZ123NoCrypto',
    },
    // Add more services as needed
  ];
}

export default ServiceTabs;
