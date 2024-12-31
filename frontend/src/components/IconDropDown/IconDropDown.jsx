import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";

export default function IconDropDown({ assets, addPlan }) {

  


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-20 justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900">
          {
            /* <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" /> */
            <img
              className="w-9 absolute bottom-8 right-8 cursor-pointer rounded-full bg-white p-1"
              // onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add to Cart"
            />
          }
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <div onClick={()=>addPlan()} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
              Add to Plans
            </div>
          </MenuItem>
          <MenuItem>
            <span className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
              Add to Cart
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
