import IMAGES from '../images/Images'
import { FC } from 'react'
import { useAppSelector } from '../hooks/redux'
import { Link, useNavigate } from 'react-router-dom'
import useAxios from '../hooks/axios'
import axios from 'axios'
import { Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { SearchIcon } from 'lucide-react'

const Navbar: FC = () => {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.user)
    const src = user.user?.displayPicture ? (user.user.displayPicture) : IMAGES.Profile
    const navItemClass: string = "text-[--nav-font-color] font-sans text-sm px-4 py-2 h-10 hover:cursor-pointer"
    const handleLogout = async () => {
        const res = await axios.request({
            method: "get",
            url: "http://localhost:8000/auth/logout/",
            withCredentials: true
        })
        navigate('/')
    }
    const { isOpen, onOpen, onClose } = useDisclosure();
    /*
    const handleSearchClick = () => {
        onOpen()
    }
    */
    return (
        <div className='flex justify-between py-3 px-2 border-b-2 border-[--border-color]'>
            <div className='flex items-center'>
                <img src={IMAGES.Logo} alt='mySvgImage' width={105} height={28} />
                <div className={navItemClass}>
                    <Link to="/">Home</Link>
                </div>
                <div className={navItemClass}>
                    <div className='flex align-middle justify-center'>
                        <Link to='/spaces'>Spaces</Link>
                        <img src={IMAGES.carrot} alt='mySvgImage' width={24} height={24} />
                    </div>
                </div>
                <div className={navItemClass}>
                    <>Templates</>
                </div>
            </div>
            <div className='flex justify-evenly space-x-5 align-middle'>
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[20rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
                <img src={IMAGES.Notification} alt='mySvgImage' width={32} height={32} />
                <img src={src} alt='mySvgImage' width={28} height={28} />
                {user.LoggedIn &&
                    <Button color='secondary' onClick={handleLogout}>Logout</Button>
                }
            </div>
            <Modal
                size="full"
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <Input
                                    classNames={{
                                        base: "max-w-full h-15",
                                        mainWrapper: "h-full",
                                        input: "text-base",
                                        inputWrapper: "h-full font-normal mt-10 text-lg text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                    placeholder="Type to search..."
                                    size="sm"
                                    startContent={<SearchIcon size={18} />}
                                    type="search"
                                    onClear={handleSearchClick}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}


export default Navbar
