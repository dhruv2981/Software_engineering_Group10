import { FC, useEffect, useState } from "react";
import {
  spaceApi,
  useGetFilesForSpacesQuery,
} from "../services/space";
import IMAGES from "../images/Images";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { privateSpaceApi } from "../services/private-space";
import { useNavigate } from "react-router-dom";
import { documentApi, fileCreation } from "../services/file";


const Space: FC = () => {
  const { data, isLoading, error } = useGetFilesForSpacesQuery();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);

  const navigate = useNavigate();

  const [publicTrigger] =
    spaceApi.endpoints.createPublicSpace.useLazyQuery();
  const [privateTrigger] =
    privateSpaceApi.endpoints.createPrivateSpace.useLazyQuery();

  const [trigger, docId] = documentApi.endpoints.saveDoc.useLazyQuery();

  const handleSubmit = () => {
    if (isPrivate) {
      privateTrigger({ name, description });
    } else {
      publicTrigger({ name, description });
    }
  };

  const handleSpaceClick = (index: number) => {
    if (data?.[index].name) {
      const spaceName: fileCreation = {
        space: data?.[index].name,
        cover: null,
        heading: "",
        isPrivate: false,
      };
      trigger(spaceName);
      setSelectedSpace(index);
    }
  };

  useEffect(() => {
    if (selectedSpace && docId.data) {
      navigate(`/space/${data?.[selectedSpace].name}/document/${docId.data}`);
    }
  }, [selectedSpace, docId.data]);

  return (
    <div className="flex items-center space-x-28 my-0 mx-auto">
      {error ? (
        <>Oh no something went wrong</>
      ) : isLoading ? (
        <img src={IMAGES.loading} />
      ) : (
        <div>
          {!data?.length ? (
            <div className="bg-cover flex justify-center items-center flex-col items-center">
              <img src={IMAGES.emptyState} width={600} height={400} />
              <div className="font-bold text-zinc-500 text-lg">
                Nothing to Show Here{" "}
              </div>
              <div className="flex space-x-10 p-4">
                <Button
                  color="secondary"
                  variant="ghost"
                  className="focus:outline-none focus-visible:outline-none"
                  onPress={onOpen}
                >
                  Create
                </Button>
                <Button color="secondary" variant="ghost">
                  Join
                </Button>
              </div>
            </div>
          ) : (
            <div className="pt-6 ">
            <div className="pl-6 w-ful">
              <Button
                color="secondary"
                  variant="ghost"
                className="focus:outline-none focus-visible:outline-none"
                onPress={onOpen}
              >
                Create
              </Button>
            </div>
              <div className="flex flex-wrap justify-evenly space-x-3`">
                {data.map((space, index: number) => (
                  <>
                    <Card className="m-6 px-6 py-4" key={index}>
                      <CardHeader className="justify-between hover:cursor-pointer">
                        <div className="flex gap-5">
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h2 className="text-xl font-semibold leading-none text-default-600">
                              {space.name}
                            </h2>
                            <h5 className="text-small tracking-tight text-default-400">
                              {space.invite_code}
                            </h5>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="px-3 py-0 text-lg text-default-400">
                        {space.description}
                      </CardBody>
                      <div className="flex-col space-y-3 p-2">
                        {space.files?.map((file, index: number) => (
                          <Card
                            key={file.docId}
                            isPressable
                            className="w-full border-purple-400 border"
                            onPress={() =>
                              navigate(
                                `/space/${space.name}/document/${file.docId}`
                              )
                            }
                          >
                            <CardBody className="text-sm text-zinc-500 font-bold">
                              {index + 1} {")"} {"     "}{" "}
                              {file.heading ? file.heading : "Untitled"}
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                      <CardFooter className="flex justify-between">
                        <div className="flex gap-3">
                          <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">
                              {space.users.length}{" "}
                            </p>
                            <p className="text-default-400 text-small">User</p>
                          </div>
                          <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">
                              {space.files?.length}
                            </p>
                            <p className="text-default-400 text-small">Files</p>
                          </div>
                        </div>
                        {!docId.isLoading ? (
                          <Button
                            color="secondary"
                            variant="ghost"
                            onClick={() => handleSpaceClick(index)}
                          >
                            Add File
                          </Button>
                        ) : (
                          <Button color="secondary" isLoading>
                            Loading
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f4699]",
          footer: "border-t-[1px] border-[#292f4699]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create A Space
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  color="secondary"
                  className="bg-[--input-color]"
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  color="secondary"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="What is your space for?"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Select color="secondary" label="Accesibillity">
                  <SelectItem
                    key="private"
                    onSelect={() => setIsPrivate(true)}
                  >
                    Private
                  </SelectItem>
                  <SelectItem
                    key="prvate"
                    onSelect={() => setIsPrivate(false)}
                  >
                    Public
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onClick={handleSubmit}
                  onPress={onClose}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Space;
