"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ReviewForm({}: {}) {
  const { restaurantId } = useParams();

  return (
    <div className="border-2 border-red-500">
      <section className="w-fit mx-auto">
        <Card className="w-fit">
          <CardBody className="w-full">
            <Image
              src="https://via.placeholder.com/350x250"
              className="w-full"
              alt="image"
              width={350}
              height={250}
            />

            <div className="pt-4 px-2">
              <h3 className="font-semibold text-lg">
                RATA Restaurant @ SS15 Subang Jaya
              </h3>
              <p className="text-sm">
                25, Jalan SS 15/5a, Ss 15, 47500 Subang Jaya, Selangor, Malaysia
              </p>
            </div>
          </CardBody>
        </Card>
      </section>

      
    


    </div>
  );
}
