interface CamperDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CamperDetails({ params }: CamperDetailsProps) {
  const { id } = await params;
  console.log(id);

  return <div></div>;
}
