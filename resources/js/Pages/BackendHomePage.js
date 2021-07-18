import {Fragment, useState, useContext} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon} from '@heroicons/react/outline'
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    DuplicateIcon,
    PencilAltIcon,
    SearchIcon,
    SelectorIcon,
    TrashIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {InertiaLink} from "@inertiajs/inertia-react";
import {BackendContext} from "./context/BackendContext";
import BackendContainer from "./components/containers/BackendContainer";
import SideBar from "./components/partials/SideBar";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const projects = [
    {
        id: 1,
        title: 'GraphQL API',
        initials: 'GA',
        team: 'Engineering',
        members: [
            {
                name: 'Dries Vincent',
                handle: 'driesvincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                handle: 'lindsaywalton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Courtney Henry',
                handle: 'courtneyhenry',
                imageUrl:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Tom Cook',
                handle: 'tomcook',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
        totalMembers: 12,
        lastUpdated: 'March 17, 2020',
        pinned: true,
        bgColorClass: 'bg-pink-600',
    },
]
const pinnedProjects = projects.filter((project) => project.pinned)

export default function BackendHomePage({settings, locale}) {
    const {sideBarOpen, toggleSideBar} = useContext(BackendContext);
    return (
        <BackendContainer>

            <h1>backedn home page</h1>


        </BackendContainer>
    );
}

