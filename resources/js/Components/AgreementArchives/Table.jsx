import React, { useState, useEffect } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon, DocumentPlusIcon, PencilSquareIcon, TrashIcon, DocumentArrowDownIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Link, useForm, usePage } from "@inertiajs/react";
import { format, set } from "date-fns";
import { Pagination } from "../Pagination";
import { router } from '@inertiajs/react'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SelectInput from "../SelectInput";
 
export function Table({ agreementArchives}) {
  const user = usePage().props.auth.user;
  const TABLE_HEAD = ["No","Nama Instansi", "Bidang Kerja Sama", "Bidang Mitra", "Kurun Waktu", "Waktu Mulai", "Waktu Berakhir", "Status", "Action"];
  const { data, setData } = useForm({
    page: agreementArchives.current_page
  })

  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e);
    setData('page', 1);

    router.get(
      route(route().current()),
      { 
        search: e,
        page: data.page
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  }

  const handleSort = () => {
    const newSortOrder = data.sort === 'asc' ? 'desc' : 'asc';
    setData(prevData => ({
      ...prevData,
      sort: newSortOrder,
      page: 1,
    }));

    router.get(
      route(route().current()),
      {
        sort: newSortOrder,
        page: 1,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  }

  const handleFilter = (e) => {
    setFilter(e);
    setData('page', 1);

    router.get(
      route(route().current()),
      {
        filter: e,
        page: 1,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  }

  useEffect(() => {
    const currentParam = route().params['search'];
    if (currentParam) {
      setQuery(currentParam)
    }
  }, []);

  const handleView = (id) => {
    router.get(route('agreementarchives.view', id));
  }

  const [inputValue, setInputValue] = useState('')
  const deleteSwal = (id) => {
    withReactContent(Swal).fire({
      title: 'Kamu yakin?',
      text: 'Anda tidak akan dapat memulihkan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your data has been deleted.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })

        router.delete(route('agreementarchives.destroy', id), {
          preserveState: true,
          onSuccess: () => {
            setData('page', 1);
          }
        })
      }
    })
  }

  return (
    <Card className="h-full w-full px-6 overflow-x-scroll max-w-screen-xl shadow-none">
      <div className="flex justify-between pt-6">
        <div className="">
        <SelectInput
            name="filter"
            className="mt-1 block w-full rounded-md"
            autoComplete="off"
            onChange={(e) => handleFilter(e.target.value)}
            options={[
                { value: 'all', label: 'Semua' },
                { value: 'active', label: 'Aktif' },
                { value: 'inactive', label: 'Non-aktif' },
                { value: 'terbaru', label: 'Terbaru' },
                { value: 'terlama', label: 'Terlama' },
                { value: 'no-document', label: 'Tidak ada dokumen' },
            ]}
        />
        </div>
        <div className="w-6/12">
          <div className="flex gap-x-4">
            <div className="w-full">
              <Input label="Search" 
                name="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />} />
            </div>
            {user.is_admin ? (
            <div className="w-fit">
              <Link href={route('agreementarchives.create')}>
                <Button color="green" className="flex items-center gap-x-2 py-2 text-nowrap ">
                  <DocumentPlusIcon className="h-6 w-6 text-white" />
                  <span className="text-white">Add New Agrement</span>
                </Button>
              </Link>
            </div>
            ): null}
          </div>
        </div>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th key={head} className="border-b border-gray-300 pb-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
            <th className="border-b border-gray-300 pb-4 pt-10">
                <Typography
                  onClick={() => handleSort()}
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none flex items-center gap-x-1 cursor-pointer"
                >
                  Created At <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                </Typography>
              </th>
          </tr>
        </thead>
        <tbody>
          {agreementArchives.data.map(({ id, nama_instansi, bidang_kerjasama, kriteria_mitra, durasi_kerjasama, waktu_kerjasama_mulai, waktu_kerjasama_selesai, dokumen_kerjasama }, index) => {
            const isLast = index === agreementArchives.length - 1;
            const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";
 
            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {index + 1}
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {nama_instansi}
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {bidang_kerjasama === 'Pendidikan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-purple-50 text-purple-500">
                        {bidang_kerjasama}
                      </span> : bidang_kerjasama === 'Pelatihan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-blue-50 text-blue-500">
                        {bidang_kerjasama}
                      </span> : bidang_kerjasama === 'Abdimas' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-orange-50 text-orange-500">
                        {bidang_kerjasama}
                      </span> : null
                    }
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {kriteria_mitra === 'Perguruan Tinggi Negeri' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-blue-50 text-blue-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Perguruan Tinggi Swasta' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-orange-50 text-orange-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Dunia Industri/Dunia Usaha' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-purple-50 text-purple-500">
                        {kriteria_mitra}
                      </span> : kriteria_mitra === 'Pemerintahan' ? 
                      <span className="border px-3 py-0.5 rounded-md bg-teal-50 text-teal-500">
                        {kriteria_mitra}
                      </span> : 
                      <span className="border px-3 py-0.5 rounded-md bg-red-50 text-red-500">
                        {kriteria_mitra}
                      </span>
                    }
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {durasi_kerjasama}
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {format(waktu_kerjasama_mulai, 'dd MMMM yyyy')}
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {format(waktu_kerjasama_selesai, 'dd MMMM yyyy')}
                  </Typography>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {
                      new Date(waktu_kerjasama_selesai) > new Date() ?
                      <span className="border px-3 py-0.5 rounded-md bg-green-50 text-green-500">
                        Active
                      </span> :
                      <span className="border px-3 py-0.5 rounded-md bg-red-50 text-red-500">
                        Inactive
                      </span>
                    }
                  </Typography>
                </td>
                <td className={`${classes} w-16`}>
                  <div className="flex justify-start gap-x-3">
                    {dokumen_kerjasama ? 
                      <a href={route('agreementarchives.download', dokumen_kerjasama)}>
                        <DocumentArrowDownIcon className="h-5 w-5 text-green-500" />
                      </a> : null
                    }
                    {user.is_admin ? (
                    <Link href={route('agreementarchives.edit', id)} className="text-blue-500 flex">
                      <PencilSquareIcon className="h-5 w-5" />
                    </Link>
                    ) : null}
                    {user.is_admin ? (
                    <Link onClick={() => deleteSwal(id)} as="button" className="text-red-500 flex">
                      <TrashIcon className="h-5 w-5" />
                    </Link>
                    ) : null}
                  </div>
                </td>
                <td className={`${classes} cursor-pointer`} onClick={() => handleView(id)}>
                  <Typography
                    variant="small"
                    className="font-normal text-gray-600"
                  >
                    {format(new Date(), 'dd/M/yyyy')}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="w-full flex justify-end py-5">
        <Pagination 
          search={route().params['search'] ?? null}
          links={agreementArchives.links}
          currentPage={agreementArchives.current_page}
          setCurrentPage={(page) => setData('page', page)}
          />
      </div>
    </Card>
  );
}